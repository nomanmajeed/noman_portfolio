'use client';

export function AppWrap(Component, idName, classNames) {
  return function HOC() {
    return (
      <div id={idName} className={`app__container ${classNames}`}>
        <div className="app__wrapper app__flex">
          <Component />
          <div className="copyright">
            <p className="p-text">@2022 NOMAN MAJEED</p>
            <p className="p-text">All rights reserved</p>
          </div>
        </div>
      </div>
    );
  };
}
