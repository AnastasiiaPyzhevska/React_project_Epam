export const loginReguest = async (user) => {
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

export const coursesReguest = async () => {
  const response = await fetch('http://localhost:4000/courses/all');
  const result = await response.json();
  return result;
};

export const authorsReguest = async () => {
  const response = await fetch('http://localhost:4000/authors/all');
  const result = await response.json();
  return result;
};
