/* eslint-disable no-console */
function errorsApiHandler(error: any) {
    let message: string;
    let status: number;
  
    // Verifica se estamos em ambiente de desenvolvimento
    const isDevelopment = import.meta.env.VITE_APP_ENV === 'development';
  
    if (error.response) {
      if (isDevelopment) {
        console.log('Response Data:', error.response.data);
        console.log('Status:', error.response.status);
        console.log('Headers:', error.response.headers);
      }
      message = error.message,
      status = error.response.status
      console.log(error)
      if(error.response.status === 400){
        message = 'Bad request' || error.response.statusText,
        status = error.response.status || 400
      } 
      if(error.response.status === 401) {
        message
      }
      if(error.response.status === 404) {
        message = 'Not Found' || error.response.statusText,
        status = error.response.status || 404
      }
      if(error.response.status === 403) {
        message =  'Forbbiden' || error.response.statusText,
        status = error.response.status || 403
      }
      if (!status) status = 500;

  
    return {
      error: true,
      status,
      message,
    };
  }
}
  
  export default errorsApiHandler;
  