import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { LinksService } from './links.service';
import {
  ApiBody,
  ApiCreatedResponse,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { Link } from './interface/link.interface';
import { CreateLinkDto } from './dto/createLink.dto';

@ApiTags('links')
@Controller('/trips/:trip_id/links')
export class LinksController {
  constructor(private readonly linksService: LinksService) {}

  @Post('/create')
  @ApiOperation({ summary: 'Adds a new link on trip' })
  @ApiBody({
    description: 'Details to add a new link',
    type: CreateLinkDto,
  })
  @ApiCreatedResponse({
    status: 201,
    description: 'Link added',
    example: {
      linkId: 'a123e4567-e89b-12d3-a456-426614174000',
    },
  })
  async addLink(@Param('trip_id') tripId: string, @Body() link: CreateLinkDto) {
    return this.linksService.createLink(tripId, link);
  }

  @Get()
  @ApiOperation({ summary: 'List all links related to the trip' })
  @ApiCreatedResponse({
    status: 200,
    description: 'Links listed',
    type: [Link],
  })
  async listLinks(@Param('trip_id') tripId: string) {
    return this.linksService.listLinks(tripId);
  }

  @Delete('/:link_id')
  @ApiOperation({ summary: 'Delete link from trip' })
  @ApiResponse({
    status: 200,
    description: 'Link deleted',
    example: {
      linkId: 'b987f6543-e21b-43d2-b456-426614174999',
    },
  })
  async deleteLink(
    @Param('trip_id') tripId: string,
    @Param('link_id') linkId: string,
  ) {
    return this.linksService.deleteLink(tripId, linkId);
  }
}
