import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { MovieList } from './MovieList';

function AppRoute() {
    return (
        <Router>
            <div>
                <Switch>
                    <Route path='/' component={MovieList}/>
                </Switch>
            </div>
        </Router>
    )
}

export { AppRoute };