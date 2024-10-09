import axios from "axios";
import { useContext, createContext, useState, useEffect } from "react";

const AuthContext = createContext();

const AuthContextComponent = ({ children }) => {
    const [user, setUser] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const getCurrentUser = async () => {
            const { data } = await axios.get('/api/account/getcurrentuser');
            setUser(data);
            setIsLoading(false);
        }
        getCurrentUser();
    }, [])

    if (isLoading) {
        return <h1>Loading...</h1>
    }
    return (<>
        <AuthContext.Provider value={{ user, setUser }}>
            {children}
        </AuthContext.Provider>
    </>)

}
const useAuthContext = () => useContext(AuthContext);
export { AuthContextComponent, useAuthContext };