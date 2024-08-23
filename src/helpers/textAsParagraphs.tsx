import React from "react";

export function textAsParagraphs(text: string): React.ReactNode {
  return text.split('\n').map((paragraph, index) => <p key={index}>{paragraph}</p>);
}
