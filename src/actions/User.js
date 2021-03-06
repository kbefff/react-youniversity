import request from 'superagent';

const baseUrl = 'http://localhost:8080';

export function login(user) {

    return dispatch => {
        request.put(`${baseUrl}/api/session/mine`)
        .set('Content-Type', 'application/json')
        .withCredentials()
        .send(user)
        .end(
            (error, response) => {
                
                if(error) {
                    console.error("could not login user" + error);
                    return;
                }
                
                localStorage.setItem("currentUser", JSON.stringify(response.body));

                dispatch({ type: 'USER_LOGIN' });

            }
        )
    }
}

export function logout() {
    
    return dispatch => {
        request.delete(`${baseUrl}/api/session/mine`)
        .set('Content-Type', 'application/json')
        .withCredentials()
        .send()
        .end(
            (error, response) => {
                
                if(error) {
                    console.error("could not logout user" + error);
                    return;
                }
                
                localStorage.removeItem("currentUser");

                dispatch({ type: 'USER_LOGOUT' });

            }
        )
    }
}

export function register(user) {
    
    return dispatch => {
        request.post(`${baseUrl}/user/create`)
        .set('Content-Type', 'application/json')
        .withCredentials()
        .send(user)
        .end(
            (error, response) => {
                
                if(error) {
                    console.error("could not create user" + error);
                    return;
                }

                dispatch({ type: 'USER_REGISTERED', result: response.body });

            }
        )
    }
}