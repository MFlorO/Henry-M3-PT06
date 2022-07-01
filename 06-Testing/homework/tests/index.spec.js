const session = require('supertest-session');
const app = require('../index.js'); // Importo el archivo de entrada del server de express.}
const agent = session(app);
const sumArray = require ("../sumArray.js")

describe('Test de APIS', () => {
  describe('GET /', () => {
    it('responds with 200', () => agent.get('/').expect(200));
    it('responds with and object with message with a property `hola`', () =>
      agent.get('/').then((res) => {
        expect(res.body.message).toEqual('hola');
      }));
  });

  describe('GET /test', () => {
    it('responds with 200', () => agent.get('/test').expect(200));
    it('responds with and object with message with a property and value`test`', () =>
      agent.get('/test').then((res) => {
        expect(res.body.message).toEqual('test');
      }));
  });

  describe('POST /sum', () => {
    it('responds with 200', () => agent.post('/sum').expect(200));
    it('receive from body two parameters "a" and "b" and responds with an object with property "result" and value the sum of "a" and "b"', () =>
      agent.post('/sum')
        .send({ a: 2, b: 3 })
        .then((res) => {
          expect(res.body.result).toEqual(5);
        }));
    it('receive from body two parameters "a" and "b" and responds with an object with property "result" and value the sum of "a" and "b"', () =>
      agent.post('/sum')
        .send({ a: 5, b: 3 })
        .then((res) => {
          expect(res.body.result).toEqual(8);
        }));
  });

  describe('POST /producto', () => {
    it('responds with 200', () => agent.post('/product').expect(200));
    it('receive from body two parameters "a" and "b" and responds with an object with property "result" and value the product of "a" and "b"', () =>
      agent.post('/product')
        .send({ a: 2, b: 3 })
        .then((res) => {
          expect(res.body.result).toEqual(6);
        }));
    it('receive from body two parameters "a" and "b" and responds with an object with property "result" and value the product of "a" and "b"', () =>
      agent.post('/product')
        .send({ a: 2, b: 5 })
        .then((res) => {
          expect(res.body.result).toEqual(10);
        }));
  });

  describe("funcion sumArray", () => {
    const arr = [1, 2, 3, 4]

    it("si encuentra la suma retorna true", () => {expect(sumArray(arr, 5)).toBe(true) });
    it("si NO encuentra la suma retorna false", () => { expect(sumArray(arr, 100)).toBe(false) });
    it("si no le paso un array como primer parametro arroja error", () => { expect(() => sumArray(1, 5)).toThrow(TypeError) });
    it("si no le paso un numero como segundo parametro arroja error", () => { expect(() => sumArray(arr, "hola").toThrow(TypeError)) });
    it("no deberia sumar 2 veces el mismo numero", () => { expect(sumArray(arr, 2)).toBe(false) });
  })

  describe('POST /sumArray', () => {
    it('responds with 200', () => agent.post('/sumArray').send({ array: [2, 5, 7, 10, 11, 15, 20], num: 13 }).expect(200));

    it("responds with 400, if parameters are not correctly sent", () => agent.post('/sumArray').expect(400))

    it('should return true if there are at least the sum of two numbers in the array is equal to number', () => {
      agent.post('/sumArray')
        .send({ array: [2, 5, 7, 10, 11, 15, 20], num: 13 })
        .then((res) => {
          expect(res.body.result).toEqual(true);
        })});


  });

  describe('POST /numString', () => {

    it('responds with 200', () => agent.post('/numString').send({word: 'hola'}).expect(200));
    it('responds with status 400 si el string es un numero', () => agent.post('/numString').send({word:1}).expect(400));
    it('responds with status 400 si el string esta vacio', () => agent.post('/numString').send({ word: " " }).expect(400));

    it('responds with an object with property result and value 4, if "hola" is sent', () => {
      agent.post('/numString').send({ word: "hola" }).then(res => {expect(res.body.result).toBe(4)})})
    
    })



});

