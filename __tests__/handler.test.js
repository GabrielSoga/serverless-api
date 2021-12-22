import axios from 'axios';
import 'regenerator-runtime/runtime'

const url = `http://localhost:3000`
	
test('Successfuly creating an entry', async () => {
    const res = await axios.post(`${url}/sparkpost`, {name: "Soga", age: "26"})
    expect(res.status).toEqual(200)
    expect(res.data.message).toMatch("Operation Successful")
});

test('Successfuly retrieving an entry previously created', async () => {
    const res = await axios.get(`${url}/sparkpost/Soga`)
    expect(res.status).toEqual(200)
    expect(res.data.name).toMatch("Soga")
    expect(res.data.age).toMatch("26")
});

test('Successfuly updating an entry previously created', async () => {
    const res = await axios.post(`${url}/sparkpost`, {name: "Soga", age: "27"})
    expect(res.status).toEqual(200)
    expect(res.data.message).toMatch("Operation Successful")
});

test('Successfuly retrieving an updated entry', async () => {
    const res = await axios.get(`${url}/sparkpost/Soga`)
    expect(res.status).toEqual(200)
    expect(res.data.name).toMatch("Soga")
    expect(res.data.age).toMatch("27")
});

test('Failing to retrieve a non-existing entry', async () => {
    const nonExistingEntry = `Soga1` 
    try {
        const res = await axios.get(`${url}/sparkpost/${nonExistingEntry}`)
    } catch (e) {
        console.log(e.response.data)
        expect(e.response.status).toEqual(404)
        expect(e.response.data.error).toEqual(`No entries for ${nonExistingEntry} were found`)
    }
});

test('Failing to GET without pathParameters', async () => {
    try {
        await axios.get(`${url}/sparkpost}`)
    } catch (e) {
        expect(e.response.status).toEqual(404)
        expect(e.response.data.error).toEqual("Serverless-offline: route not found.")
    }
});

test('Failing to use put method', async () => {
    try {
        await axios.put(`${url}/sparkpost/test`)
    } catch (e) {
        expect(e.response.status).toEqual(404)
        expect(e.response.data.error).toEqual("Serverless-offline: route not found.")
    }
});

test('Failing to use delete method', async () => {
    try {
        await axios.delete(`${url}/sparkpost/test`)
    } catch (e) {
        expect(e.response.status).toEqual(404)
        expect(e.response.data.error).toEqual("Serverless-offline: route not found.")
    }
});