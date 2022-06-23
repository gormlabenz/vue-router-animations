import NProgress from 'nprogress'

export const install = ({ isClient, router }) => {
    if (isClient) {
        router.beforeEach(() => {
            NProgress.start()
        })
        router.afterEach(() => {
            NProgress.done()
        })
    }
}
