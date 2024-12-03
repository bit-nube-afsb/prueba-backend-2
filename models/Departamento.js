import { Schema, model } from 'mongoose';

const DepartamentoSchema = new Schema({
  codigo: { type: Number, required: true, unique: true },
  nombre: { type: String, required: true }
});

const Departamento = model('Departamento', DepartamentoSchema);

export default Departamento;