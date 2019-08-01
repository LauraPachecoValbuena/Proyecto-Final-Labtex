import React from "react";
import Navbar from "./Navbar";
import { Switch, Route } from "react-router";
import ShowUsers from "./ShowUsers";
import EditUser from "./EditUser";
import AddUser from "./AddUser";


const LayoutPage: React.FC = () => {
    return (
        <div>
            <Navbar />
            <Switch>
                <Route path="/users/add" exact component={AddUser} />
                <Route path="/users/list" exact component={ShowUsers} />
                <Route path="/users/edit/:user_id" exact component={EditUser} />
            </Switch>
            
        </div>
    );
};

export default LayoutPage;