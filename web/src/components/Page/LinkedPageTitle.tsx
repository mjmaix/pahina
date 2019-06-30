import React from 'react';

interface PageTitleProps {
  title: string;
  sub?: string;
  link?: string;
}

export function LinkedPageTitle(props: PageTitleProps) {
  const { title, sub, link } = props;
  return (
    <div>
      <p className="Title">{title}</p>
      {!!sub && <p className="Sub">{sub}</p>}
      {!!link && (
        <div className="Link">
          <a href={link}>{link}</a>
        </div>
      )}
    </div>
  );
}
