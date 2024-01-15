import React from 'react';
import MathRenderer from '@/components/parsers/MathRenderer';

const App: React.FC = () => {
  return (
    <div>
      <h1>Dynamic Math Rendering</h1>
      <MathRenderer expression="\begin{cases}
a_1x+b_1y+c_1z=d_1\\
a_2x+b_2y+c_2z=d_2\\
a_3x+b_3y+c_3z=d_3\\
\end{cases}" />
    </div>
  );
};

export default App;
