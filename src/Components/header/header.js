import css from './header.module.scss';
import { Profile } from './profile/profile';

export const Header = () => {
    return (
        <header className={css.header}>
        <div className={css.header__container}>
            <a href='/' className={css.header__logo} >Awesome Kanban Board</a>
        </div>
        <Profile/>
        </header>
    )
}