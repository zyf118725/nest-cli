import { ArgumentMetadata, Injectable, PipeTransform, BadRequestException, HttpException, HttpStatus } from '@nestjs/common';
import { validate } from 'class-validator';
import { plainToClass, plainToInstance } from 'class-transformer';
@Injectable()
export class GoodsPipe implements PipeTransform {
  async transform(value: any, { metatype }: ArgumentMetadata) {
    console.log('value====: ', value, this.toValidate(metatype));
    if (!metatype || !this.toValidate(metatype)) {
      // 如果没有传入验证规则，则不验证，直接返回数据
      return value;
    }
    // value====:  { name: '商品10', price: '99' } { metatype: [class AddDto], type: 'body', data: undefined }

    // 将对象转化为class来验证
    const object = plainToInstance(metatype, value);
    const errors = await validate(object);
    console.log('errors: ', errors);
    /*
    errors:  [
     ValidationError {
        target: AddDto { name: '', price: '99' },
        value: '',
        property: 'name',
        children: [],
        constraints: { isNotEmpty: 'name should not be empty' }
      }
    ]
    */
    if (errors.length > 0) {
      // throw new HttpException(errors, HttpStatus.BAD_REQUEST);
      const msg = Object.values(errors[0].constraints)[0]; // 只需要取第一个错误信息并返回即可
      throw new BadRequestException(`Validation failed: ${msg}`);
    }
    return value;
  }

  private toValidate(metatype: any): boolean {
    const types: any[] = [String, Boolean, Number, Array, Object];
    return !types.includes(metatype);
  }
}
