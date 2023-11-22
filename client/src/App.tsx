import React, {FC} from "react";
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import Cars from "./pages/Cars/Cars";
import CarsFavourites from "./pages/Cars/CarsFavourites";
import Header from "./components/header";
import { QueryClient, QueryClientProvider} from 'react-query'

import { library } from '@fortawesome/fontawesome-svg-core'
import { fas } from '@fortawesome/free-solid-svg-icons'
import Message from "./components/Message";


const App: FC = () => {

    const queryClient = new QueryClient()

    return (
        <QueryClientProvider client={queryClient}>
            <BrowserRouter>
                <Header/>
                <Routes>
                    <Route path="/" element={<Cars/>}/>
                    <Route path="/favourites" element={<CarsFavourites/>}/>
                    <Route path="*" element={<Message message={'NotFound'} />}/>
                </Routes>
            </BrowserRouter>
        </QueryClientProvider>
    );
};

export default App;
library.add(fas)