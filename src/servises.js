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

export const coursesRequest = () =>
  fetch('http://localhost:4000/courses/all')
    .then((result) => result.json())
    .catch((err) => console.log(err));

export const authorsRequest = () =>
  fetch('http://localhost:4000/authors/all')
    .then((result) => result.json())
    .catch((err) => console.log(err));
