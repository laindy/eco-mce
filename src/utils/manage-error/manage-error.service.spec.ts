import { Test, TestingModule } from '@nestjs/testing';

import { ErrorMessage } from '@/types/errors/errorHttp';
import { HttpStatusCode } from '@/types/global/http/code';

import { ManageErrorService } from './manage-error.service';

describe('ManageErrorService', () => {
  let service: ManageErrorService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ManageErrorService],
    }).compile();

    service = module.get<ManageErrorService>(ManageErrorService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should be throw error', () => {
    try {
      service.ServerError(ErrorMessage.FORBIDDEN, HttpStatusCode.FORBIDDEN);

      fail();
    } catch (error) {
      expect(error).toBeDefined();
    }
  });
});
