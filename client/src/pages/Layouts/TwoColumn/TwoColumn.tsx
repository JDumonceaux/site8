import { ReactNode } from 'react';
import './twoColumn.css';
import MainMenu from '../../../components/common/MainMenu/MainMenu';

interface IProps {
  pageTitle: ReactNode;
  left: ReactNode;
  right: ReactNode;
}

function TwoColumn({ pageTitle, left, right }: IProps) {
  return (
    <>
      <main className='main-content' role='main'>
        {pageTitle}
        {left}
      </main>
      <section className='left-sidebar'>
        <MainMenu />
      </section>
      <aside className='right-sidebar'>{right}</aside>
    </>
  );
}

export default TwoColumn;
