import { Controller, Get, Render, Post, Body, Res} from '@nestjs/common';
import { AppService } from './app.service';
import { Orderdto } from './order.dto';
import { Response, response } from 'express';


@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  @Render('index')
  getHello() {
    return {
      message: this.appService.getHello()
    };
  }

  @Get('order')
  @Render('orderForm')
  orderForm(){
    return {
      data: {},
      errors: []
    }
  }

  @Post('order')
  order(@Body() orderDto: Orderdto, @Res() response: Response){
    const errors: string[] = [];

    if(!orderDto.nev || !orderDto.termek || !orderDto.szaml_cim || !orderDto.szaml_iranyito || !orderDto.szaml_orszag || !orderDto.szaml_varos){
      errors.push('Minden mezőt kötelező megadni!')
    }
    if(orderDto.kupon && /^[A-Z]{2}-\d{4}$/.test(orderDto.kupon)){
      errors.push('A kuponkód nem megfelelő formátumú!')
    }

    if(errors.length > 0){
      response.render('orderForm', {
        data: orderDto,
        errors
      })
    }
  }


  @Get('orderSuccess')
  @Render('success')
  success(){
    
  }
}
