import { Test, TestingModule } from "@nestjs/testing"
import { PagesController } from "./pages.controller"
import { PagesService } from "./pages.service"
import { getModelToken } from "@nestjs/mongoose"
import { Page } from "./entities/page.schema"
import { UpdatePageDto } from "./dto/update-page.dto"
import { Types } from "mongoose"

describe("PagesController", () => {
  let controller: PagesController
  let service: PagesService

  const mockPage: Partial<Page> = {
    id: "1" as unknown as Types.ObjectId,
    title: "Test Page",
    subTitle: "Test Subtitle",
    type: "Test Type",
    url: "http://test.com",
    domainId: "1" as unknown as Types.ObjectId,
    isActive: true,
  }

  const mockPagesService = {
    findOne: jest.fn((id: string) => Promise.resolve(mockPage)),
    update: jest.fn((id: string, dto: UpdatePageDto) =>
      Promise.resolve({ ...mockPage, ...dto })
    ),
    remove: jest.fn((id: string) => Promise.resolve(mockPage)),
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
      controllers: [PagesController],
      providers: [
        PagesService,
        {
          provide: getModelToken(Page.name),
          useValue: mockPageModel,
        },
        {
          provide: PagesService,
          useValue: mockPagesService,
        },
      ],
    }).compile()

    controller = module.get<PagesController>(PagesController)
    service = module.get<PagesService>(PagesService)
  })

  it("should be defined", () => {
    expect(controller).toBeDefined()
  })

  describe("findOne", () => {
    it("should return a page", async () => {
      const result = await controller.findOne("1")
      expect(result).toEqual(mockPage)
      expect(service.findOne).toHaveBeenCalledWith("1")
    })
  })

  describe("update", () => {
    it("should update and return the page", async () => {
      const updatePageDto: UpdatePageDto = { title: "Updated Title" }
      const result = await controller.update("1", updatePageDto)
      expect(result).toEqual({ ...mockPage, ...updatePageDto })
      expect(service.update).toHaveBeenCalledWith("1", updatePageDto)
    })
  })

  describe("remove", () => {
    it("should remove and return the page", async () => {
      const result = await controller.remove("1")
      expect(result).toEqual(mockPage)
      expect(service.remove).toHaveBeenCalledWith("1")
    })
  })
})
