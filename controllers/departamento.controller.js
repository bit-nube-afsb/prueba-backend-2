import Departamento from '../models/Departamento.js';

export const getDepartamentos = async (req, res) => {
    try {
      const departamentos = await Departamento.find();
      res.status(200).json(departamentos);
    } catch (error) {
      res.status(500).json({ message: 'Error al obtener los departamentos', error });
    }
};

export const getDepartamentoByCodigo = async (req, res) => {
    const { codigo } = req.params;
    try {
      const departamento = await Departamento.findOne({ codigo: codigo });
      if (!departamento) {
        return res.status(404).json({ message: 'Departamento no encontrado' });
      }
      res.status(200).json(departamento);
    } catch (error) {
      res.status(500).json({ message: 'Error al obtener el departamento', error });
    }
};

export const createDepartamento = async (req, res) => {
    const { codigo, nombre } = req.body;
    try {
      const nuevoDepartamento = new Departamento({ codigo, nombre });
      await nuevoDepartamento.save();
      res.status(201).json({ message: 'Departamento creado con éxito', departamento: nuevoDepartamento });
    } catch (error) {
      res.status(500).json({ message: 'Error al crear el departamento', error });
    }
};

export const updateDepartamento = async (req, res) => {
    const { codigo } = req.params;
    const { nombre } = req.body;
    try {
      const departamentoActualizado = await Departamento.findOneAndUpdate(
        { codigo: codigo },
        { nombre },
        { new: true }
      );
      if (!departamentoActualizado) {
        return res.status(404).json({ message: 'Departamento no encontrado' });
      }
      res.status(200).json({ message: 'Departamento actualizado con éxito', departamento: departamentoActualizado });
    } catch (error) {
      res.status(500).json({ message: 'Error al actualizar el departamento', error });
    }
  };

export const deleteDepartamento = async (req, res) => {
    const { codigo } = req.params;
    try {
      const departamentoEliminado = await Departamento.findOneAndDelete({ codigo: codigo });
      if (!departamentoEliminado) {
        return res.status(404).json({ message: 'Departamento no encontrado' });
      }
      res.status(200).json({ message: 'Departamento eliminado con éxito', departamento: departamentoEliminado });
    } catch (error) {
      res.status(500).json({ message: 'Error al eliminar el departamento', error });
    }
};

