const request = require('supertest');
const app = require('./app');



describe('Todos API', () => {

    it("GET /todos return Array of todos", () => {
        // Bruger super test modulet til at simulere et request kald
        return request(app).get('/todos')
        // Forventer et respons af content type json
        .expect('Content-Type', /json/)
        // Forventer status er 200 OK, som returner et promise
        .expect(200).then(response => {
            // Så forventer vi at response body indeholder et array af objekter som har properties med navn og om de er færdige
            expect(response.body).toEqual(expect.arrayContaining([
                // God til at teste på et object for at se om de specifikke 
                expect.objectContaining({
                    // Forventer property med string
                    name: expect.any(String),
                    completed: expect.any(Boolean)
                })
            ]))
        })
    });

    it("GET /todos/id specific todo", () => {
        return request(app).get('/todos/1')
        // Forventer et respons af content type json
        .expect('Content-Type', /json/)
        // Forventer status er 200 OK, som returner et promise
        .expect(200).then(response => {
            // Så forventer vi at response body indeholder et array af objekter som har properties med navn og om de er færdige
            expect(response.body).toEqual(expect.objectContaining({
                id: expect.any(Number),
                // Forventer property med string
                name: expect.any(String),
                completed: expect.any(Boolean)
            }))
        })
    })
    // })

    it("GET /todos/id specific todo, should fail", () => {
        return request(app).get('/todos/999999').expect(422);
    });

    it('Post create todos', () => {
        return request(app).post('/todos').send({
            name: 'Do dishes'
        }).expect('Content-Type', /json/).expect(201).then((response) => {
            expect(response.body).toEqual(expect.objectContaining({
                // Forventer property med string
                name: 'Do dishes',
                completed: false
            }))

        })

    });

    it('POST /todos validate request', () => {
        return request(app).post('/todos').send({ name: 123 }).expect(422);
    });



})
