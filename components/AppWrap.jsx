'use client';

export function AppWrap(Component, idName, classNames) {
  return function HOC() {
    return (
      <div id={idName} className={`app__container ${classNames}`}>
        <div className="app__wrapper app__flex">
          <Component />
        </div>
      </div>
    );
  };
}
