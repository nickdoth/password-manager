import React from 'react';
import PageFrame from '../src/components/PageFrame';

import { passwordList } from './1-PasswordList.stories';

export default {
    title: 'PageFrame',
};

export const pageFrame = () => <PageFrame title="密碼列表">
    {passwordList()}
</PageFrame>;

