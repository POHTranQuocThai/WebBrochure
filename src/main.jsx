import { render } from 'preact'
import FreshSaladWebsite from './app'
import './app.css'
import "./i18n"; // 👈 load i18n before App
render(<FreshSaladWebsite />, document.getElementById('app'))
