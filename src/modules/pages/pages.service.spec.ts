import { Test, TestingModule } from "@nestjs/testing"
import { PagesService } from "./pages.service"
import { getModelToken } from "@nestjs/mongoose"
import { Page } from "./entities/page.schema"

describe("PagesService", () => {
  let service: PagesService

  const mockPage = {
    _id: "1",
    title: "Test Page",
    subTitle: "Test Subtitle",
    type: "Test Type",
    url: "http://test.com",
    domainId: "1",
  }

  const mockPageModel = {
    new: jest.fn().mockResolvedValue(mockPage),
    constructor: jest.fn().mockResolvedValue(mockPage),
    find: jest.fn(),
    findOne: jest.fn(),
    update: jest.fn(),
    create: jest.fn(),
    remove: jest.fn(),
  }

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        PagesService,
        {
          provide: getModelToken(Page.name),
          useValue: mockPageModel,
        },
      ],
    }).compile()

    service = module.get<PagesService>(PagesService)
  })

  it("should be defined", () => {
    expect(service).toBeDefined()
  })

  // Add your tests here
})
