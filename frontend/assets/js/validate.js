function getSession() {
    const session = localStorage.getItem('session');
    if (session) {
      const sessionData = JSON.parse(session);
      console.log('Session data:', sessionData);
      return sessionData;
    } else {
      window.location.href="./login.html"
      return null;
    }
  }
  getSession()