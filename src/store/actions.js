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

    },

    saveObject(context, object) {

        return new Promise((resolve, reject) => {

            let ok = false;

            this._vm.$fetch(object.path, "POST", object.data)
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

    deleteObject(context, object) {

        return new Promise((resolve, reject) => {

            let ok = false;

            this._vm.$fetch(object.path, "DELETE")
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

    getObjects(context, object) {

        return new Promise((resolve, reject) => {

            let ok = false;

            this._vm.$fetch(object.path)
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

    changePassword(context, passwords) {

        return new Promise((resolve, reject) => {

            this._vm.$fetch("users/change-password",  "POST", passwords)
            .then(response => {
                if (response.ok) return resolve();
                return response.json();
            })
            .then(data => {
                throw data;
            })
            .catch(error => {
                reject(error);
            });
            
        });

    }

};