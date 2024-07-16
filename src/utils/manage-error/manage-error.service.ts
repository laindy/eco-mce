import { HttpException, Injectable } from '@nestjs/common';

import { ErrorMessage } from '@/types/errors/errorHttp';
import { HttpStatusCode } from '@/types/global/http/code';

@Injectable()
export class ManageErrorService {
  ServerError(
    message: ErrorMessage,
    code: HttpStatusCode,
    params?: { describe: string; message?: string }
  ) {
    throw new HttpException(
      {
        status: code,
        error: message,
        ...params,
      },
      code
    );
  }
}
