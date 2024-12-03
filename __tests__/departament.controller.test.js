import {describe, expect, jest} from '@jest/globals';

jest.unstable_mockModule('../models/Departamento.js', () => ({
    default: {
      find: jest.fn(),
      create: jest.fn(),
    },
  }));

const { getDepartamentos, createDepartamento } = await import('../controllers/departamento.controller.js');
const Departamento = (await import('../models/Departamento.js')).default;

describe('Get Departamentos', () => {
    it('debería devolver una lista de departamentos con status 200', async () => {
      const mockDepartamentos = [
        { codigo: 1, nombre: 'RH' },
        { codigo: 2, nombre: 'IT' },
      ];
  
      Departamento.find.mockResolvedValue(mockDepartamentos);
  
      const req = {};
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };
  
      await getDepartamentos(req, res);
      expect(res.status).toHaveBeenCalledWith(200);
  
      expect(res.json).toHaveBeenCalledWith(mockDepartamentos);
    });
  
    it('debería devolver un error con status 500 si ocurre un fallo', async () => {
      Departamento.find.mockRejectedValue(new Error('Error en la base de datos'));
  
      const req = {};
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };
  
      await getDepartamentos(req, res);

      expect(res.status).toHaveBeenCalledWith(500);
  
      expect(res.json).toHaveBeenCalledWith({
        message: 'Error al obtener los departamentos',
        error: expect.any(Object),
      });
    });
  });

  describe('Create Departamento', () => {
  
    it('debería devolver un error con status 500 si ocurre un fallo al crear', async () => {
      Departamento.create.mockRejectedValue(new Error('Error en la base de datos'));
  
      const req = {
        body: { codigo: 1, nombre: 'RH' },
      };
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };
  
      await createDepartamento(req, res);
  
      expect(res.status).toHaveBeenCalledWith(500);
  
      expect(res.json).toHaveBeenCalledWith({
        message: 'Error al crear el departamento',
        error: expect.any(Object),
      });
    });
  });