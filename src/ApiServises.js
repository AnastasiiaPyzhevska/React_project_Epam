export const registrationRequest = async (newCustomer) => {
  try {
    const response = await fetch('http://localhost:4000/register', {
      method: 'POST',
      body: JSON.stringify(newCustomer),
      headers: {
        'Content-Type': 'application/json',
      },
    });
    const result = await response.json();
    return result;
  } catch (e) {
    return alert(e);
  }
};

export const loginRequest = async (user) => {
  try {
    const response = await fetch('http://localhost:4000/login', {
      method: 'POST',
      body: JSON.stringify(user),
      headers: {
        'Content-Type': 'application/json',
      },
    });
    const result = await response.json();
    return result;
  } catch (e) {
    return alert(e);
  }
};

export const checkUserRequest = async () => {
  fetch('http://localhost:4000/users/me', {
    headers: {
      accept: '*/*',
      Authorization:
        'Bearer y2zOajZX+zm0OhWzFkbGs02BLsMCFD94gFvInOpLcjDrJW1Ag+Cy66pMNHn3ky4dJleOrff+w1WkQepKrXcXPqfoxxCez+L6S4nJNYQ2zG4R/WtYdG8ZrR2HaYLJ5IqoQTnPs2to2DoXy2RyFaeJFozkt2lF8LoiVPLYbv4Y6VymzyFdN67Jph5AJkpHPD8v4tuFMfqlMzSPaPTzU7yeZcFdDU8oBKfMQx8ZViebbrQWQ2juU4lC5EhecuP2ioYules/MP/c0YrfGZGTjztnYP1x2/6bDMc8Qfu40mUyytemjn+g9EFKNiF/ip49KlF5wOdge8aw+mXuPg43HBmKlA==',
    },
  })
    .then((result) => result.json())
    .catch((err) => console.log(err));
};

export const coursesRequest = () =>
  fetch('http://localhost:4000/courses/all')
    .then((result) => result.json())
    .catch((err) => console.log(err));

export const authorsRequest = () =>
  fetch('http://localhost:4000/authors/all')
    .then((result) => result.json())
    .catch((err) => console.log(err));
