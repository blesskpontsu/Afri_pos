import * as React from 'react';

declare module 'react-router-dom' {
    export const Route: React.FC<any>;
    export const Redirect: React.FC<any>;
}
