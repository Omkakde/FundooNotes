import * as React from 'react';
import { Box, Stack, Typography, Avatar, Link, Divider } from '@mui/material';
import {
  AccountPreview,
  AccountPopoverFooter,
  SignOutButton,
} from '@toolpad/core/Account';

import { useSession } from '@toolpad/core/useSession';

export function UserOrg() {
  const session = useSession();
  if (!session?.user) {
    return <Typography>No user session available</Typography>;
  }

  const { logo: orgLogo, name: orgName, url: orgUrl } = session.org;

  return (
    <Stack spacing={2} sx={{ padding: 2, maxWidth: 400, mx: 'auto' }}>
      <AccountPreview variant="expanded" />
      <Divider />
      {session.org && (
        <Stack mb={1} alignItems="center">
          
          <Box display="flex" flexDirection="column" alignItems="center" gap={2}>
           
            <Avatar
              variant="circle"
              src={orgLogo}
              alt={orgName}
              sx={{ width: 60, height: 60, borderRadius: '50%' }}
            />
          
            <Stack spacing={0.5} alignItems="center">
              <Typography variant="h6" fontWeight="bold">
                {orgName}
              </Typography>
              <Link
                variant="body2"
                href={orgUrl}
                target="_blank"
                rel="noopener noreferrer"
                sx={{ color: 'text.secondary' }}
              >
                {orgUrl}
              </Link>
            </Stack>
          </Box>
        </Stack>
      )}
      <Divider />
      <AccountPopoverFooter>
        <SignOutButton sx={{ mt: 1, width: '100%' }} />
      </AccountPopoverFooter>
    </Stack>
  );
}
