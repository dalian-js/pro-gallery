import { GALLERY_CONSTS } from 'pro-gallery-lib';
import GalleryDriver from '../drivers/reactDriver';
import { expect } from 'chai';
import { mergeNestedObjects } from 'pro-gallery-lib';
import { images2 } from '../drivers/mocks/items';
import { styleParams, container } from '../drivers/mocks/styles';

describe('styleParam - overlaySize', () => {
  let driver;
  let initialProps;

  beforeEach(() => {
    driver = new GalleryDriver();
    initialProps = {
      container,
      items: images2,
      styles: styleParams,
    };
    initialProps.styles = mergeNestedObjects(initialProps.styles, {
      galleryLayout: GALLERY_CONSTS.layout.GRID,
      overlaySize: 50,
      overlaySizeType: 'PIXEL',
      overlayPadding: 30,
    });
  });

  it('should set the correct overlayPosition - TOP position', async () => {
    initialProps.styles = mergeNestedObjects(initialProps.styles, {
      overlayPosition: GALLERY_CONSTS.overlayPositions.TOP,
    });
    driver.mount.proGallery(initialProps);
    await driver.update();
    const overlaySizeImage = driver.find.selector('.gallery-item-hover').at(0);
    const { height, width } = overlaySizeImage.props().style;
    expect(height).to.eq(50);
    expect(width).to.eq(360);
    driver.detach.proGallery();
  });

  it('should set the correct overlayPosition - RIGHT position', async () => {
    initialProps.styles = mergeNestedObjects(initialProps.styles, {
      overlayPosition: GALLERY_CONSTS.overlayPositions.RIGHT,
    });
    driver.mount.proGallery(initialProps);
    await driver.update();
    const overlaySizeImage = driver.find.selector('.gallery-item-hover').at(0);
    const { width, height } = overlaySizeImage.props().style;
    expect(width).to.eq(50);
    expect(height).to.eq(360);
    driver.detach.proGallery();
  });
});