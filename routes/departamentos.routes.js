import express from "express";
import {
    getDepartamentoByCodigo,
    getDepartamentos,
    createDepartamento,
    updateDepartamento,
    deleteDepartamento
} from '../controllers/departamento.controller.js'
const router = express.Router();

router.get('/test', (req,res) =>{
    res.send('Ruta de prueba para departamento')
});

router.get('/', getDepartamentos);
router.get('/:codigo', getDepartamentoByCodigo);
router.post('/', createDepartamento);
router.put('/:codigo', updateDepartamento);
router.delete('/:codigo', deleteDepartamento);

export default router;