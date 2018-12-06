export default {

    register(context, user) {

        return new Promise((resolve, reject) => {

            let ok = false;

            this._vm.$fetch("users/register-admin", "POST", user)
            .then(response => {
                ok = response.ok;
                return response.json();
            })
            .then(data => {
                if (ok) return resolve(data);
                throw data;
            })
            .catch(error => {
                reject(error);
            });

        });

    },

    login(context, user) {

        return new Promise((resolve, reject) => {

            let ok = false;

            this._vm.$fetch("users/login", "POST", user)
            .then(response => {
                ok = response.ok;
                return response.json();
            })
            .then(data => {
                if (ok) return resolve(data);
                throw data;
            })
            .catch(error => {
                reject(error);
            });

        });

    }

};