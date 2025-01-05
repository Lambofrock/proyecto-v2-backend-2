import mongoose from "mongoose";import { createHash } from "../utils.js";


const {Schema} = mongoose;

const userSchema = new Schema({
 email:{type: String,unique:true, required: true},
 role:{type: String,default:"user"}, 
 password:{type: String, required: true},
 first_name:{type: String, required: true},
 last_name:{type: String, required: true},
 age:{type: Number, required: true},
});
 userSchema.pre("save", function(next){
  if(this.isNew || this.isModified("password")){
    // this.password = bcrypt.hashSync(this.password, bcrypt.genSaltSync(10));
    this.password = createHash(this.password);
  }
  next();
});
const userModel = mongoose.model("user", userSchema);

export default userModel;