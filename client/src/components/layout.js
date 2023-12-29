import { Outlet } from 'react-router-dom';
import {Navbar} from './components';
import {Footer} from './components'

const layout=() => {
    return(
        <>
        <main>
            <Navbar />
            <Outlet />
            <Footer />
        </main>
        
        </>
    )
}

export default layout;