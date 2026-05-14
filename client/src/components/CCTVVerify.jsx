import React, { useState } from 'react';

const CCTVVerify = () => {

  const [result, setResult] = useState(null);

  const verifyFace = async () => {

    const response = await fetch(
      'http://localhost:5000/api/cctv/verify',
      {
        method: 'POST'
      }
    );

    const data = await response.json();

    setResult(data);
  };

  return (
    <div>

      <button onClick={verifyFace}>
        Verify CCTV Face
      </button>

      {
        result && (
          <div>

            <h2>
              Match: {result.matched ? 'YES' : 'NO'}
            </h2>

            <h3>
              User: {result.name}
            </h3>

          </div>
        )
      }

    </div>
  );
};

export default CCTVVerify;