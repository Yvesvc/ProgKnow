import { useAuth0 } from '@auth0/auth0-react';
import React, { useCallback, useState } from 'react';
import { apiEndpoint } from '../appsettings';

export default Report;

interface IProps {
  objectId: string;
}

function Report({ objectId }: IProps): JSX.Element {
  const [termReported, SetTermReported] = useState(false);
  const [_objectId, SetObjectId] = useState(objectId);
  const { isAuthenticated, isLoading, getAccessTokenSilently } = useAuth0();

  const ReportTerm = useCallback(async (event: React.MouseEvent<HTMLElement, MouseEvent>) => {
    const accessToken: string = await getAccessTokenSilently();

    const request: Request = new Request(apiEndpoint + 'api/report/' + _objectId, {
      method: 'post',
    });
    request.headers.set('authorization', 'bearer ' + accessToken);

    let response: Response = await fetch(request);

    if (response.ok) {
      return SetTermReported(true);
    } else {
      console.log('error');
    }
  }, []);

  return (
    <div>
      {!isLoading &&
        (isAuthenticated ? (
          <div>
            <p
              style={{ fontSize: '2rem', display: termReported ? 'none' : 'inline' }}
              className="icon btn-link bi-exclamation-square"
              onClick={ReportTerm}
              aria-disabled
            ></p>
            <p style={{ fontSize: '1rem', display: termReported ? 'inline' : 'none' }}>Term reported</p>
          </div>
        ) : (
          <div></div>
        ))}
    </div>
  );
}
