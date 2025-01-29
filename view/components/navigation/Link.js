import React, {useEffect} from "react";
import { Link } from "react-router-dom";

export const Link = ({to, ...props}) => {
    fetch(to, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
    })
    return <Link to={to} {...props}/>
}