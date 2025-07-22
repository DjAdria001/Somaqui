import mongoose from 'mongoose';

const MONGO_URI = 'mongodb+srv://Somaqui:Rul0xMlLWkGQnnUm@cluster0.hg3zlsp.mongodb.net/somaqui?retryWrites=true&w=majority&appName=Cluster0';


mongoose.connect(MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
} as any)
.then(() => console.log("✅ Conectado a MongoDB Atlas"))
.catch((err) => console.error("❌ Error de conexión:", err));
