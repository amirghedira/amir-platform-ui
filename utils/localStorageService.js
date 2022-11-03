const LocalStorageService = (
    function () {
        const _setToken = (accessToken) => {
            localStorage.setItem("access_token", accessToken);
        }
        const _getAccessToken = () => {
            return localStorage.getItem("access_token");
        }
        const _clearToken = () => {
            localStorage.removeItem("access_token");
        }
        const _setAccessToken = (accessToken) => {
            localStorage.setItem("access_token", accessToken);
        }

        return {
            setToken: _setToken,
            setAccessToken: _setAccessToken,
            getAccessToken: _getAccessToken,
            clearToken: _clearToken

        };
    })();
export default LocalStorageService;