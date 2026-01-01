module.exports = {
    root: true,
    overrides: [
        {
            files: ['src/**/*.ts', 'src/**/*.js', 'src/**/*.tsx'],
            rules: {
                /*
                 * Discourage direct instantiation or direct calls to service constructors/functions.
                 * Prefer using the centralized ServiceFactory getters, e.g. ServiceFactory.getImageService().
                 */
                'no-restricted-syntax': [
                    'error',
                    {
                        selector: "NewExpression[callee.name=/Service$/]",
                        message:
                            "Instantiate services via ServiceFactory.get*Service() instead of using 'new <Service>()'.",
                    },
                    {
                        selector: "CallExpression[callee.name=/Service$/]",
                        message:
                            "Access services via ServiceFactory.get*Service() instead of calling service factories directly.",
                    },
                    {
                        selector: "MemberExpression[object.name='res'][property.name=/json|send/]",
                        message:
                            "Use ResponseHelper.success()/ResponseHelper.error() instead of res.json()/res.send() in route handlers.",
                    },
                ],
            },
        },
    ],
};
