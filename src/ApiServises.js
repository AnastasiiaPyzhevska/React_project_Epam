export const registrationRequest = async (newCustomer) => {
  try {
    const response = await fetch('http://localhost:4000/register', {
      method: 'POST',
      body: JSON.stringify(newCustomer),
      headers: {
        'Content-Type': 'application/json',
        Authorization: localStorage.token,
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
        Authorization: localStorage.token,
      },
    });
    const resultData = await response.json();
    const userData = resultData.user;
    const success = resultData.successful;
    const tokenUser = resultData.result;
    if (!success) {
      alert('Email or password are wrong, OR you are new User, please link to Registration');
    } else {
      localStorage.setItem('token', tokenUser);
      localStorage.setItem('name', userData.name);
      localStorage.setItem('isAuth', true);
    }
    return userData;
  } catch (e) {
    return alert(e);
  }
};

export const logoutRequest = async () => {
  await fetch('http://localhost:4000/logout', {
    method: 'DELETE',
    headers: {
      Authorization: localStorage.token,
    },
  })
    .then((result) => {
      if (result && result.status === 200) {
        localStorage.removeItem('token');
        localStorage.removeItem('name');
        localStorage.removeItem('isAuth');
        return { successful: true };
      }
      throw new Error('something went wrong');
    })
    .catch((err) => console.log(err));
};

export const addNewCourse = async (course) => {
  try {
    const response = await fetch('http://localhost:4000/courses/add ', {
      method: 'POST',
      body: JSON.stringify(course),
      headers: {
        'Content-Type': 'application/json',
        Authorization: localStorage.token,
      },
    });
    const result = await response.json();
    return result;
  } catch (e) {
    return alert(e);
  }
};

export const addNewAuthor = async (author) => {
  try {
    const response = await fetch('http://localhost:4000/authors/add', {
      method: 'POST',
      body: JSON.stringify(author),
      headers: {
        'Content-Type': 'application/json',
        Authorization: localStorage.token,
      },
    });
    const result = await response.json();
    return result;
  } catch (e) {
    return alert(e);
  }
};

export const deleteCourseById = async (id) => {
  try {
    const response = await fetch(`http://localhost:4000/courses/${id}`, {
      method: 'DELETE',
      headers: {
        Authorization: localStorage.token,
      },
    });
    const result = await response.json();
    return result;
  } catch (e) {
    return alert(e);
  }
};

export const updateCourseById = async (id, course) => {
  try {
    const response = await fetch(`http://localhost:4000/courses/${id}`, {
      method: 'PUT',
      body: JSON.stringify(course),
      headers: {
        'Content-Type': 'application/json',
        Authorization: localStorage.token,
      },
    });
    const result = await response.json();
    return result;
  } catch (e) {
    return alert(e);
  }
};

export const authorizeUserRequest = async () => {
  try {
    const response = await fetch(`http://localhost:4000/users/me`, {
      method: 'GET',
      headers: {
        Authorization: localStorage.token,
      },
    });
    const userData = await response.json();
    const user = userData.result;
    return user;
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
