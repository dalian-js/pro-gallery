import GalleryDriver from '../../../__tests__/drivers/reactDriver';

describe('Gallery Services', () => {
  let galleryDriver;
  let galleryViewProps;

  beforeEach(() => {
    galleryDriver = new GalleryDriver();
    galleryViewProps = galleryDriver.props.galleryView();
  });

  describe(' gallery api ', () => {
    // it('should return all gallery photos using getPhotos', () => {
    //   expect(galleryViewProps.items).toBe()
    // })
  });
});
