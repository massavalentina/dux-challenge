import 'primereact/resources/themes/saga-blue/theme.css';  // Tema
import 'primereact/resources/primereact.min.css';          // Estilos de componentes
import 'primeicons/primeicons.css';                        // Iconos
import 'primeflex/primeflex.css'; // Asegúrate de importar PrimeFlex aquí

import './styles/globals.css';
import MenuBar from './components/layout/MenuBar';
import Sidebar from './components/layout/SideBar';
import styles from "./page.module.scss";

export const metadata = {
  title: 'Dux Challenge',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <title>{metadata.title}</title>
        <meta name="description" content={metadata.description} />
      </head>
      <body>
        <header>
          <MenuBar />
        </header>
        <div className={styles['main-content-wrapper']}>
          <aside>
            <Sidebar />
          </aside>
          <main className={styles['main-content']}>
            {children}
          </main>
        </div>
      </body>
    </html>
  );
}
