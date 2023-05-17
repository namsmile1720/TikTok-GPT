import Home from '~/pages/Home';
import Following from '~/pages/Following';
import Profile from '~/pages/Profile';
import Upload from '~/pages/Upload';

// Public Routes
const publicRoutes = [
    { path: '/', component: Home },
    { path: '/following', component: Following },
    { path: '/@', component: Profile },
    { path: '/upload', component: Upload, Layout: null },
];
const privateRoutes = [];

export { publicRoutes, privateRoutes };
