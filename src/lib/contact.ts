import { ContactInput } from "./definitions/contact";

const sendEmail = async (inputs: ContactInput) => {
    const formData = new FormData();
    formData.append('name', inputs.name);
    formData.append('email', inputs.email);
    formData.append('message', inputs.message);
    const res = await fetch('/api/contact', {
        method: 'POST',
        body: formData
    })
    if(!res.ok){
        throw new Error ("Email failure: " + res.statusText)
    }
    return await res.json()
}

export { sendEmail }