
import { PrismaClient } from '@prisma/client';
import session from 'express-session';
import express from 'express';
import cors from "cors";
import { paginate } from "prisma-extension-pagination";
// import { paginate } from 'paginate-prisma';



const prisma = new PrismaClient();
const xprisma = new PrismaClient().$extends({
  model: {
    product: {
      paginate,
    },
  },
});
const app = express();
app.set("trust proxy", 1);

const port = 5000;
app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
    methods: "GET, POST, PUT, DELETE"
  })
);
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Credentials", true);
  res.header("Access-Control-Allow-Headers",
  "Origin, X-Requested-With, Content-Type, Accept, Authorization, X-HTTP-Method-Override, Set-Cookie, Cookie");
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
  next();  
});
app.use(express.json());
app.use(
  session({
   
    secret: "sarah",
    resave: false,  // Set to false to avoid unnecessary session saves
    saveUninitialized: false,
    cookie: {
      secure: false,   // Set to false for development. In production, this should be true if using HTTPS
      httpOnly: true,
      sameSite: "lax", // Use "lax" to allow the cookie with cross-site requests
      maxAge: 8600000
    },
  })
);





app.post('/user', async (req, res) => {
  
  const data = req.body;
const post = await prisma.user.create({
  data: {
    firstName: data.first_name,
    lastName: data.last_name,
    email: data.email,
    password: data.password,
    phoneNumber : data.phone_number,
    password: data.password,
  },
}
)
res.json(post)
  })


  app.post('/login', async (req, res) => {
    try {
      const { email, password } = req.body;
    
  
      // Check if both email and password are provided
      if (!email || !password) {
        return res.status(400).json({ error: "Please enter both email and password" });
      }
  
      // Find the user in the Users collection (assuming Users is a model)
      const user = await prisma.user.findUnique({
        where: {
          email: email,
          password: password,
        },
      })
  
      if (user) {
        // If the user is found and the credentials match
      
        req.session.user = {id: user.id, username: user.firstName};
        req.session.save(function (err) {
          if (err) return next(err)
            console.log(res.session)
            res.json(req.session.user)
        })
       

      } else {
        // If no user matches the credentials
        return res.status(401).json({ error: 'Invalid credentials' });
      }
    } catch (error) {
      // Handle any other errors
      console.error(error);
      return res.status(500).json({ error: 'An error occurred. Please try again later.' });
    }
  });

  app.get('/get-session', (req, res)=>{
    console.log("SARAH",req.session)
    
    if (req.session.user) {
        res.send('Session data: '
            + JSON.stringify(req.session.user));
    } else {
        res.send('No session data found');
    }
});
  

  app.post('/products', async (req, res) => {
    const data = req.body;
    const price = await prisma.price.create({data: {purchasePrice: parseFloat(data.price.purchase_price), rent: parseInt(data.price.rent_rate, 10) , validity: data.price.validity}})
    console.log("SARAH", req.session);
    const user = req.session.user;
    const categories = data.categories.map((category) => category);

   
  const product = await prisma.product.create({
    data: {
      title: data.title,
      description: data.description,
      categories: {
        set: categories // Set the categories enum values
      },
      user: {
        connect: { id: user.id } // Connect the existing user
      },
      price: {
        connect: { id: price.id } // Connect the newly created price
      },

    },
  }
  )
  res.json(product)
    })

    app.patch('/product/:id/edit',  async (req, res) => {
      const data = req.body;
      const categories = data.categories.map((category) => category);
      const product = await prisma.product.findFirst({
        where: {
          id: parseInt(req.params.id,10),
        }
      });
      const price = await prisma.price.update ({
        where: {

          id: product.priceId
        },
        data: {purchasePrice: parseFloat(data.price.purchasePrice), rent: parseInt(data.price.rent, 10) , validity: data.price.validity}
      }

      )
      const updateProduct = await prisma.product.update ({
        where: {
          id:  parseInt(req.params.id,10),
        },
        data: {
          title: data.title,
          description: data.description,
          categories: {
            set: categories // Set the categories enum values
          },
        },
      })

res.json(updateProduct);
    })

  
  
  app.get('/',  async (req, res) => {
    
    const allUsers = await prisma.user.findMany()
    res.json(allUsers)
      })


  app.get('/categories',  async (req, res) => {
    const categories = [
      'ELECTRONICS',
      'FURNITURE',
      'HOME_APPLIANCES',
      'SPORTING_GOODS',
      'OUTDOOR',
      'TOY',
    ];
    
    res.json(categories);
      })
  
  app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
  })


  app.get('/products', async (req, res) => {
    // const products = await paginate(prisma.product)({
    //   include: {
    //     price: true, // Include the associated price
    //   },
    // }, {
    //   page: 1,
    //   limit: 10,
    // });
  
    // res.json(products);
    const [response] = await xprisma.product
  .paginate({
    include: {
      price: true,
    }
  })
  .withPages({
    limit: 10,
    page: 1,
    includePageCount: true,
  });
  console.log(response);
  res.json(response);

  });


  app.delete('/product/:id', async (req, res) => {
    const { id } = req.params;
    const product = await prisma.product.delete({
          where: {
            id: parseInt(id, 10),
          },
        })
        res.json(product)
  })

  app.get('/product/:id', async (req, res) => {
    const { id } = req.params;
    const product = await prisma.product.findUnique({
          where: {
            id: parseInt(id, 10),
          },
          include: {
            price: true,
          }
        })
        res.json(product)
  })